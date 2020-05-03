/* eslint-env jest */
import AsyncTransitionComponent from './AsyncTransitionComponent.js';

import {render} from '@testing-library/react';
import React    from 'react';

/**
 * Tests for the async transition component.
 */
describe('react-async-transition-component', function() {

	const SomeComponent = () => (
		<div>Hello!</div>
	);

	test('Applies class name', function() {
		let loader = new Promise(resolve => {
			// Never resolves
		});
		let testClass = 'testclass';
		let {container} = render(
			<AsyncTransitionComponent className={testClass} loader={loader}/>
		);
		expect(container.firstElementChild.classList.contains(testClass)).toBe(true);
	});

	test('Applies transition class after underlying component loaded', async function() {
		jest.useFakeTimers();
		let loader = new Promise(resolve => {
			setTimeout(() => {
				resolve(SomeComponent);
			}, 200);
		});
		let transitionClass = 'transitionclass';
		let {container} = render(
			<AsyncTransitionComponent transitionClassName={transitionClass} loader={loader}/>
		);
		expect(container.firstElementChild.classList.contains(transitionClass)).toBe(false);
		jest.runAllTimers();
		await loader;
		expect(container.firstElementChild.classList.contains(transitionClass)).toBe(true);
	});
});
