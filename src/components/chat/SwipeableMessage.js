import { useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { corRosaForte } from '../../constants';

const SwipeableMessage = (props) => {
    const swipeableRef = useRef(null);

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }

    return (
        <Swipeable ref={swipeableRef} friction={1} onSwipeableOpen={closeSwipeable} renderLeftActions={() => <MaterialIcons name="reply" size={30} color={corRosaForte} />} onActivated={props.onActivated} enabled={props.enabled}>
            {props.children}
        </Swipeable>
    )
}

export default SwipeableMessage