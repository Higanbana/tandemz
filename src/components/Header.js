import React from 'react';
import _ from 'lodash';

import { Link, safePrefix } from '../utils';

export default class Header extends React.Component {
  logEvent = () => {
    console.log(this.props);
    window.gtag('event', 'click', {
      event_category: 'Request demo',
      event_label: this.props.pageContext.url,
    });
  };
  render() {
    return (
      <header id="masthead" className="site-header outer">
        <div className="inner">
          <div className="site-header-inside">
            <div className="site-branding">
              {_.get(
                this.props,
                'pageContext.site.siteMetadata.header.logo_img',
              ) && (
                <p className="site-logo">
                  <Link to={safePrefix('/')}>
                    <img
                      src={safePrefix(
                        _.get(
                          this.props,
                          'pageContext.site.siteMetadata.header.logo_img',
                        ),
                      )}
                      alt="Logo"
                    />
                  </Link>
                </p>
              )}
            </div>
            {_.get(this.props, 'pageContext.menus.main') &&
              _.get(
                this.props,
                'pageContext.site.siteMetadata.header.has_nav',
              ) && (
                <React.Fragment>
                  <nav
                    id="main-navigation"
                    className="site-navigation"
                    aria-label="Main Navigation"
                  >
                    <div className="site-nav-inside">
                      <button id="menu-close" className="menu-toggle">
                        <span className="screen-reader-text">Open Menu</span>
                        <span className="icon-close" aria-hidden="true" />
                      </button>
                      <ul className="menu">
                        {_.map(
                          _.get(this.props, 'pageContext.menus.main'),
                          (item, item_idx) => (
                            <li
                              key={item_idx}
                              className={
                                'menu-item ' +
                                (_.get(this.props, 'pageContext.url') ===
                                _.get(item, 'url')
                                  ? ' current-menu-item'
                                  : '')
                              }
                            >
                              <Link to={safePrefix(_.get(item, 'url'))}>
                                {_.get(item, 'title')}
                              </Link>
                            </li>
                          ),
                        )}
                        {_.get(
                          this.props,
                          'pageContext.site.siteMetadata.header.menu.actions',
                        ) &&
                          _.map(
                            _.get(
                              this.props,
                              'pageContext.site.siteMetadata.header.menu.actions',
                            ),
                            (action, action_idx) => (
                              <li
                                key={action_idx}
                                className="menu-item menu-button"
                              >
                                <Link
                                  to={safePrefix(_.get(action, 'url'))}
                                  className="button"
                                  onClick={this.logEvent}
                                >
                                  {_.get(action, 'label')}
                                </Link>
                              </li>
                            ),
                          )}
                      </ul>
                    </div>
                  </nav>
                  <button id="menu-open" className="menu-toggle">
                    <span className="screen-reader-text">Close Menu</span>
                    <span className="icon-menu" aria-hidden="true" />
                  </button>
                </React.Fragment>
              )}
          </div>
        </div>
      </header>
    );
  }
}
