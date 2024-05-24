import React from 'react';
import { LargePanelProps } from '../utils/types';

const LargePanel: React.FC<LargePanelProps> = ({ name, wait_time, workers, waiting, idle, time_to_return, recently_blocked_keys, top_keys }) => {
    return (
        <div className='large-panel panel-box'>
            <h1>{name}</h1>
            <div className='panel-grid'>

                <div className='display-panel-info'>
                    <p>Wait time: {wait_time}</p>
                    <p>Waiting: {waiting}</p>
                    <p>Idle: {idle}</p>
                    <p>Time to return: {time_to_return}</p>
                    <p>Workers: {workers}</p>
                </div>
                <div>
                    {/* <p>Recently Blocked Keys</p>
                    <p>Key: recentlyBlockedKeys.id</p>
                    <p>Number of Times Blocked: recentlyBlockedKeys.numberOfTimesBlocked</p>
                    <p>Date: recentlyBlockedKeys.date</p> */}
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={3}>Recently Blocked Keys</th>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Times Blocked</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                            </tr>
                            <tr>
                                <td>Data 4</td>
                                <td>Data 5</td>
                                <td>Data 6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>

                    {/* <p>Top Keys</p>
                    <p>Key: topKeys.id</p>
                    <p>Number: topKeys.floatNumber</p> */}
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Top Keys</th>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                            </tr>
                            <tr>
                                <td>Data 4</td>
                                <td>Data 5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}

export default LargePanel