/* 
 * Copyright 2020, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
