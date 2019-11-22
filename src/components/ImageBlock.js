import React from 'react';
import _ from 'lodash';

import {safePrefix, markdownify, Link} from '../utils';

export default class ImageBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} className={'block text-block bg-' + _.get(this.props, 'section.bg') + ' outer'}>
              <div className="inner">
                <div>
                  {_.get(this.props, 'section.image') && 
                  <div className="block-overlap">
                    <img src={safePrefix(_.get(this.props, 'section.image'))} alt={_.get(this.props, 'section.title')} />
                  </div>
                  }
                </div>
              </div>
            </section>
        );
    }
}
