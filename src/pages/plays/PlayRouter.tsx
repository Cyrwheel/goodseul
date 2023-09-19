import React from 'react';
import { useParams } from 'react-router-dom';
import {Attendance, PlayShop} from './';




const PlayRouter = () => {
    const { pID } = useParams();
    const returnPage = (pID: string): React.JSX.Element => {
        switch (pID) {
            case "atd":
                return <Attendance />;
            case "shop":
                return <PlayShop />;
            default:
                return <div>404 Not Found</div>;
        }
    }
    return <div className='divPlays'>{returnPage(pID ?? "")}</div>
};

export default PlayRouter;