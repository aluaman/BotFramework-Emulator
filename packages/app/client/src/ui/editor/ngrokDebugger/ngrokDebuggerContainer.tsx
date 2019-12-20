import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { Column, Row, LinkButton, LargeHeader } from '@bfemulator/ui-react';
import { SharedConstants } from '@bfemulator/app-shared';
import { RootState } from '../../../state/store';
import { TunnelError, TunnelStatus } from '../../../state';
import { executeCommand } from '../../../state/actions/commandActions';
import { GenericDocument } from '../../layout';
import * as styles from './ngrokDebuggerContainer.scss';


export interface NgrokDebuggerProps {
  inspectUrl: string;
  errors: TunnelError;
  publicUrl: string;
  logPath: string;
  postmanCollectionPath: string;
  tunnelStatus: TunnelStatus;
  timestamp: string;
  onAnchorClick: (linkRef: string) => void;
  onSaveFileClick: (originalFilePath: string, dialogOptions: Electron.SaveDialogOptions) => void;
  onCheckNgrokStatusClick: () => void
}

const dialogOptions: Electron.SaveDialogOptions = {
  title: 'Save Postman collection to disk',
  buttonLabel: 'Save',
};

export const NgrokDebugger = (props: NgrokDebuggerProps) => {
  const [statusDisplay, setStatusDisplay] = useState({
    status: 'Inactive',
    iconClass: '' 
  });

  const convertToAnchorOnClick = (link: string) => {
    props.onAnchorClick(link);
  };

  useEffect(() => {
    switch (props.tunnelStatus) {
      case TunnelStatus.Active:

        break;
      case TunnelStatus.Error:
        break;
      default:
        break;
    }
  }, [props.tunnelStatus]);

  const tunnelConnections = (
    <section>
      <h2>Tunnel Connections</h2>
      <ul className={styles.tunnelDetailsList}>
        <li>
          <legend> Inspect Url </legend>
          <LinkButton
            ariaLabel="Ngrok Inspect Url.&nbsp;"
            linkRole={true}
            onClick={() => convertToAnchorOnClick(props.inspectUrl)}
          >
            {props.inspectUrl}
          </LinkButton>
        </li>
        <li>
          <legend>Public Url</legend>
          <LinkButton
            ariaLabel="Ngrok Public Url.&nbsp;"
            linkRole={true}
            onClick={() => convertToAnchorOnClick(props.publicUrl)}
          >
            {props.publicUrl}
          </LinkButton>
        </li>
        <li>
          <LinkButton
            ariaLabel="Download Log file.&nbsp;"
            linkRole={true}
            onClick={() => props.onSaveFileClick(props.logPath, dialogOptions)}
          >
            Click here
          </LinkButton>
          &nbsp;to download the ngrok log file for this session
        </li>
        <li>
          <LinkButton
            ariaLabel="Download postman collection&nbsp;"
            linkRole={true}
            onClick={() => props.onSaveFileClick(props.postmanCollectionPath, dialogOptions)}
          >
            Click here
          </LinkButton>
          &nbsp;to download a Postman collection to additionally inspect your tunnels
        </li>
      </ul>
    </section>
  );

  return (
    <GenericDocument className={styles.ngrokDebuggerContainer}>
      <LargeHeader>Ngrok Debug Console</LargeHeader>
      <Row>
        <Column>
          <section>
            <h2>Tunnel Health</h2>
            <ul className={styles.tunnelDetailsList}>
              <li>
                <legend>Tunnel Status</legend>
                <span> InActive </span>
                <span className={[styles.tunnelHealthIndicator, styles.healthStatusBad].join(' ')} />
                <span>&nbsp;{props.timestamp}</span>
              </li>
              <li>
                <LinkButton linkRole={true} onClick={props.onCheckNgrokStatusClick}>
                  Click here
                </LinkButton>
                &nbsp;to ping the tunnel now
              </li>
              {
                props.errors.statusCode
                ? <li>
                    <div>
                      <legend>Tunnel Errors</legend>
                      <p className={styles.errorWindow}>Test</p>
                    </div>
                  </li>
                : null
              }
              
            </ul>
          </section>
          {props.publicUrl ? tunnelConnections : null}
        </Column>
      </Row>
    </GenericDocument>
  );
};

const mapStateToProps = (state: RootState, ownProps: {}): Partial<NgrokDebuggerProps> => {
  const { inspectUrl, errors, publicUrl, logPath, postmanCollectionPath, tunnelStatus, timestamp } = state.ngrokTunnel;
  return {
    inspectUrl,
    errors,
    publicUrl,
    logPath,
    postmanCollectionPath,
    tunnelStatus,
    timestamp,
    ...ownProps
  };
};

const onFileSaveCb = (result: boolean) => {
  if (!result) {
    console.error('An error occured trying to save the file to disk');
  }
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
  onAnchorClick: (url: string) => {
    dispatch(executeCommand(true, SharedConstants.Commands.Electron.OpenExternal, null, url));
  },
  onSaveFileClick: (originalFilePath: string, dialogOptions: Electron.SaveDialogOptions) => {
    dispatch(
      executeCommand(
        true,
        SharedConstants.Commands.Electron.ShowSaveDialog,
        (newFilePath: string) => {
          dispatch(
            executeCommand(
              true,
              SharedConstants.Commands.Electron.CopyFile,
              onFileSaveCb,
              originalFilePath,
              newFilePath
            )
          );
        },
        dialogOptions
      )
    );
  },
});

export const NgrokDebuggerContainer = connect(mapStateToProps, mapDispatchToProps)(NgrokDebugger);
