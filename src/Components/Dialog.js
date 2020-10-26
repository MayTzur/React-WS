import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { DialogContent, DialogTitle, DialogContentText, Button, DialogActions } from '@material-ui/core';
import { ExclamationCircleTwoTone } from '@ant-design/icons';

export const DeleteConfirm = (props) => {
    console.log('*** DeleteConfirm, props=', props);

    return(
        <Rodal 
        visible={props.visible} 
        onClose={() => props.onClose()}
        animation='rotate'>
      <div>
        <DialogTitle id="alert-dialog-title"><ExclamationCircleTwoTone style={{ fontSize: '20px' }} twoToneColor='#fa8c16'/>{'  Just to be sure,'}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you really want to delete this information?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={() => props.onClick()}>Yap!</Button>
            <Button onClick={() => props.onClose()}>No, Cancel</Button>
        </DialogActions>
      </div>
    </Rodal>
    )
  }

export const ShowConfirm = (props) => {
    console.log('*** showConfirm, props=', props)

    return(    
        <Rodal 
            visible={props.visible} 
            onClose={() => props.onClose()}
            animation='rotate'>
          <div>
            <DialogTitle id="alert-dialog-title">{'Login problem...'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    We were unable to verify your login information.\nPlease note that if the login attempt fails 3 times this page will be locked for 10 minutes.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={() => props.onClick()}>Try again</Button>
                <Button onClick={() => props.onClose()}>Cancel</Button>
            </DialogActions>
          </div>
        </Rodal>
    )
}