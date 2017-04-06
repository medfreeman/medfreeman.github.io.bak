/* eslint-disable react/jsx-no-bind */

import React, { PropTypes } from "react"
import cx from "classnames"
import _ from "lodash"

import styles from "./index.css"

class Gallery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        // Copied from http://codepen.io/desandro/pen/nFrte
        this.filterFns = {
        };

        this.isoOptions = {
            itemSelector: '.gallery-item-container',
            layoutMode: 'masonry',
            masonry: {
                // Using a sizer element is necessary to prevent a vertical collapse between data loads
                // Ex. load all, then load metal, the metal will collapse into a vertical layout if this masonry: {}
                // section is commented out.
                columnWidth: '.gallery-item-sizer'
            },
            //sortBy: 'name', // If you want to set the default sort, do that here.
            getSortData: {
            }
        };
    }
    componentDidMount() {
        if ( typeof window === 'undefined' ) {
          return
        }

        const Isotope = require("isotope-layout")

        if (this.iso == null) {
            this.iso = new Isotope(this.isotopeContainer, this.isoOptions);
        }

        // Only arrange if there are elements to arrange
        if (_.get(this, 'props.children.length', 0) > 0) {
            this.iso.arrange();
        }
    }
    componentDidUpdate(prevProps) {
        // The list of keys seen in the previous render
        const currentKeys = _.map(prevProps.children, (n) => n.key);

        // The latest list of keys that have been rendered
        const newKeys = _.map(this.props.children, (n) => n.key);

        // Find which keys are new between the current set of keys and any new children passed to this component
        const addKeys = _.difference(newKeys, currentKeys);

        // Find which keys have been removed between the current set of keys and any new children passed to this component
        const removeKeys = _.difference(currentKeys, newKeys);

        if (removeKeys.length > 0) {
            _.each(removeKeys, removeKey => this.iso.remove(document.getElementById(removeKey)));
            this.iso.arrange();
        }
        if (addKeys.length > 0) {
            this.iso.addItems(_.map(addKeys, (addKey) => document.getElementById(addKey)));
            this.iso.arrange();
        }
    }
    componentWillUnmount() {
        if (this.iso != null) {
            this.iso.destroy();
        }
    }
    render() {
        return <div className="isotope" ref={ node => this.isotopeContainer = node }>
            <div className={
                   cx(
                     "gallery-item-sizer",
                     styles["gallery-item-sizer"],
                   )
                 }
            />
            {
              React.Children.map(this.props.children, (element) => {
                return (
                  <div
                    className={
                      cx(
                        "gallery-item-container",
                        styles["gallery-item-container"],
                      )
                    }
                  >
                    {
                      React.cloneElement(
                        element,
                        {
                          className: cx(
                            element.className,
                            styles["gallery-item"],
                          ),
                        },
                      )
                    }
                  </div>
                )
              })
            }
        </div>
    }
}

Gallery.propTypes = {
  children: PropTypes.node,
}

export default Gallery
