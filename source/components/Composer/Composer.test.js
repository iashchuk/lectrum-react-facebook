// Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const props = {
    _createPost: jest.fn(),
};

const initialState = {
    comment: '',
};

const result = mount(<Composer { ...props } />);

describe('composer: component', () => {
    test('should have 1 <section> element', () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test('should have 1 <form> element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 <textarea> element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 <input> element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 <img> element', () => {
        expect(result.find('img')).toHaveLength(1);
    });
});

describe('composer: state', () => {
    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });
    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });
});
