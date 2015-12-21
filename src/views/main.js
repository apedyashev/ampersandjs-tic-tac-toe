import app from 'ampersand-app'
import View from 'ampersand-view'
import dom from 'ampersand-dom'
import ViewSwitcher from 'ampersand-view-switcher'
import _ from 'lodash'
import domify from 'domify'
import localLinks from 'local-links'
// TODO: place gulp-template-compile-commonjs to separate module that supports UMD
const templates = require('../templates');

/**
 * This app view is responsible for rendering all content that goes into
 * It's initted right away and renders itself on DOM ready.
 */
const MainView = View.extend({
    template: templates.body,
    autoRender: true,
    initialize: function() {
        // this marks the correct nav item selected
        this.listenTo(app, 'page', this.handleNewPage);
    },
    events: {
        'click a[href]': 'handleLinkClick'
    },
    render: function() {
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate(this);

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function(newView /* , oldView*/) {
                // it's inserted and rendered for me
                document.title = _.result(newView, 'pageTitle') || 'AmpersandJS Tic-Tac-Toe implementation ';
                document.scrollTop = 0;

                // add a class specifying it's active
                dom.addClass(newView.el, 'active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        return this;
    },

    handleNewPage: function(view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    // Handles all `<a>` clicks in the app not handled
    // by another view. This lets us determine if this is
    // a click that should be handled internally by the app.
    handleLinkClick: function(e) {
        // This module determines whether a click event is
        // a local click (making sure the for modifier keys, etc)
        // and dealing with browser quirks to determine if this
        // event was from clicking an internal link. That we should
        // treat like local navigation.
        const localPath = localLinks.pathname(e);

        if (localPath) {
            e.preventDefault();
            app.navigate(localPath);
        }
    },

    updateActiveNav: function() {
        const path = window.location.pathname.slice(1);

        this.queryAll('.nav a[href]').forEach(function(aTag) {
            const aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                dom.addClass(aTag.parentNode, 'active');
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});

export default MainView
