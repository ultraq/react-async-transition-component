/* eslint-env jest */
import AsyncTransitionComponent from './AsyncTransitionComponent.js';

import {configure, mount} from 'enzyme';
import Adapter            from 'enzyme-adapter-react-16';
import React              from 'react';

configure({
	adapter: new Adapter()
});

/**
 * Tests for the async transition component.
 */
describe('react-async-transition-component', function() {

	const SomeComponent = () => (
		<div id="some-component">Hello!</div>
	);

	test('Applies class name', function() {
		let loader = new Promise(resolve => {
			// Never resolves
		});
		let testClass = 'testclass';
		let wrapper = mount(
			<AsyncTransitionComponent className={testClass} loader={loader}/>
		);
		expect(wrapper.is(`.${testClass}`)).toBe(true);
	});

	test('Applies transition class after underlying component loaded', function() {
		jest.useFakeTimers();
		let loader = new Promise(resolve => {
			setTimeout(() => {
				resolve(SomeComponent);
			}, 200);
		});
		let transitionClass = 'transitionclass';
		let wrapper = mount(
			<AsyncTransitionComponent transitionClassName={transitionClass} loader={loader}/>
		);
		expect(wrapper.is(`.${transitionClass}`)).toBe(false);
		jest.runAllTimers();
		return loader.then(() => {
			wrapper.update();
			expect(wrapper.find(`.${transitionClass}`).exists()).toBe(true);
		});
	});
});
