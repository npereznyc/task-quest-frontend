import React from 'react'
import { useState, useEffect } from 'react'

export default function RedeemRewards() {
    const [rewards, setRewards] = useState([])
    const listRewards = async () => {
        try {
            const response = await fetch('/reward', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setRewards(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        listRewards()
    }, [rewards])

    return (
        <div className='redeem-rewards'>
            <h4>Redeem Rewards</h4>
                <ul>
                    {rewards.map((reward) => {
                        return (
                            <li key={reward._id}>
                                <div className='reward-name'>{reward.rewardName}</div>
                                <div className='reward-points'>{reward.rewardPoints} Points</div>
                                <button>Buy</button>
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}
