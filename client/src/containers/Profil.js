import React from 'react';

import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';




const styles = {
    classes: {
        bigAvatar: {
            width: 60,
            height: 60,
        },
    },
};

function Profil(props) {
    console.log(props);
    const { classes, user } = props;
    let fullName = user.first_name + ' ' + user.last_name;

    let image = '';
    if (props.user.image) {
        image = <Avatar
            alt={props.user.first_name}
            src={props.user.image + "-sm"}
            className={classNames(classes.avatar, classes.bigAvatar)}
        />
    }
    else {
        const name = user.first_name.substring(0, 1) + user.last_name.substring(0, 1);
        image = <Avatar
            className={classNames(classes.bigAvatar)}
        >{name}</Avatar>
    }

    return (
        <div>
            <h1 className='header'>Profile</h1>
            {image}
            <p>{fullName}</p>
        </div>
    )
}


export default withStyles(styles)(Profil);
