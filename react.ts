'use strict';

import * as ko from 'knockout';
import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

(<any>ko.bindingHandlers).react = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        // setup unmount
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            unmountComponentAtNode(element);
        });
        return { controlsDescendantBindings: false };
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        const component = ko.unwrap(valueAccessor());
        const props = ko.toJS(allBindingsAccessor.get('props'));

        render(createElement(component, props), element);
    }
};
