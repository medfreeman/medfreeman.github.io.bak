/* eslint-disable react/jsx-no-bind */

import React, { PropTypes } from "react"
import _ from "lodash"

class Isotope extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.filterFns = props.filterFns ? props.filterFns : {};

        this.isoOptions = props.isoOptions ? props.isoOptions : {};
    }
    componentDidMount() {
        if ( typeof window === 'undefined' ) {
          return
        }

        const Isotope = require("isotope-layout")

        if (
          typeof this.props.isoOptions.layoutMode !== 'undefined' &&
          this.props.isoOptions.layoutMode === 'packery'
        ) {
          require("isotope-packery")

        }

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
        return (
          <div className="isotope" ref={ node => this.isotopeContainer = node }>
            { this.props.children }
          </div>
        )
    }
}

Isotope.propTypes = {
  children: PropTypes.node,
  filterFns: PropTypes.object,
  isoOptions: PropTypes.object,
}

export default Isotope
