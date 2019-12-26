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

import {
  NgrokTunnelActions,
  NgrokTunnelAction,
  TunnelInfo,
  NgrokTunnelPayloadTypes,
  TunnelError,
  TunnelStatus,
  TunnelStatusAndTs,
} from '../actions/ngrokTunnelActions';

export interface ngrokTunnelState {
  errors: any;
  publicUrl: string;
  inspectUrl: string;
  logPath: string;
  postmanCollectionPath: string;
  tunnelStatus: TunnelStatus;
  lastTunnelStatusCheckTS: string;
}

const DEFAULT_STATE: ngrokTunnelState = {
  inspectUrl: 'http://127.0.0.1:4040',
  publicUrl: '',
  logPath: '',
  postmanCollectionPath: '',
  errors: {},
  tunnelStatus: TunnelStatus.Inactive,
  lastTunnelStatusCheckTS: '',
};

export function ngrokTunnel(
  state: ngrokTunnelState = DEFAULT_STATE,
  action: NgrokTunnelAction<NgrokTunnelPayloadTypes>
): ngrokTunnelState {
  switch (action.type) {
    case NgrokTunnelActions.setDetails:
      const tunnelInfo: TunnelInfo = action.payload as TunnelInfo;
      state = {
        ...state,
        ...tunnelInfo,
      };
      break;
    case NgrokTunnelActions.updateOnError:
      state = {
        ...state,
        errors: action.payload as TunnelError,
      };
      break;
    case NgrokTunnelActions.setStatus:
      const info: TunnelStatusAndTs = action.payload as TunnelStatusAndTs;
      state = {
        ...state,
        tunnelStatus: info.status,
        lastTunnelStatusCheckTS: info.ts,
      };
      break;
  }
  return state;
}

export default ngrokTunnel;
