import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {htmlToReact, safePrefix} from '../utils';

export default class Contact extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <div className="outer">
              <div className="inner-medium">
                <article className="post page post-full">
                  <header className="post-header">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  </header>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                  </div>
                  }
                  <div className="post-content">
                    {htmlToReact(_.get(this.props, 'pageContext.html'))}
                    <form name="contactForm" method="POST" netlifyHoneypot="bot-field" data-netlify="true" id="contact-form"
                      className="contact-form">
                      <p className="screen-reader-text">
                        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                      </p>
                      <p className="form-row">
                        <label className="form-label">Nom</label>
                        <input type="text" name="surname" className="form-input"/>
                      </p>
                      <p className="form-row">
                        <label className="form-label">Prénom</label>
                        <input type="text" name="name" className="form-input"/>
                      </p>
                      <p className="form-row">
                        <label className="form-label">Email address</label>
                        <input type="email" name="email" className="form-input"/>
                      </p>
                      <input type="hidden" name="form-name" value="contactForm" />
                      <p className="form-row form-submit">
                        <button type="submit" className="button">Send Message</button>
                      </p>
                    </form>
                  </div>
                </article>
              </div>
            </div>
            </Layout>
        );
    }
}
