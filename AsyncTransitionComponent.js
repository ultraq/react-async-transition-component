
import AsyncComponent from '@ultraq/react-async-component';
import classNames     from 'classnames';
import PropTypes      from 'prop-types';
import React          from 'react';

/**
 * A combined async component loader that is aware of transitions, letting them
 * only take place once the target component is loaded.  Renders a container to
 * hold the transition class which will be performed when the underlying
 * component is loaded.
 * 
 * @param {String} className
 * @param {String} transitionClassName
 * @param {...Object} loaderProps
 * @return {*}
 */
const AsyncTransitionComponent = ({className, transitionClassName, ...loaderProps}) => (
	<AsyncComponent {...loaderProps}>
		{(Component, componentProps) => (
			<div className={classNames(className, {[transitionClassName]: Component})}>
				{Component ? <Component {...componentProps}/> : null}
			</div>
		)}
	</AsyncComponent>
);

AsyncTransitionComponent.propTypes = {
	className: PropTypes.string,
	transitionClassName: PropTypes.string
};

export default AsyncTransitionComponent;
