//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';

import { filterChildren } from '../utils';
import * as Colors from '../colors/colors';

const CSS = css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    fontFamily: 'Segoe UI'
});

const HEADER_CSS = css({
    backgroundColor: Colors.SECTION_HEADER_BACKGROUND_DARK,
    color: Colors.SECTION_HEADER_FOREGROUND_DARK,
    lineHeight: '30px',
    minHeight: '30px',
    textTransform: 'uppercase',
    paddingLeft: '24px'
});

const CONTROLS_CSS = css({
    margin: '0 0 0 auto'
});

const CONTENT_CSS = css({
    backgroundColor: Colors.PANEL_BACKGROUND_DARK,
    color: Colors.PANEL_FOREGROUND_DARK,
    padding: '16px',
    flex: 1
});

export default class Panel extends React.Component {
    render() {
        return (
            <div className={ CSS }>
                <div className={ HEADER_CSS }>
                    { this.props.title }
                    <div className={ CONTROLS_CSS }>
                        { filterChildren(this.props.children, child => child.type === Controls) }
                    </div>
                </div>
                <div className={ CONTENT_CSS }>
                    <div>
                        { filterChildren(this.props.children, child => child.type === Content) }
                    </div>
                </div>
            </div>
        );
    }
}

export const Controls = props => props.children;
export const Content = props => props.children;
