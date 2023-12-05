import React from 'react'
import { PollProvider } from '../context/pollContext'
import Poll from '../components/Poll/Poll'

const CreatePoll = () => {

    return (
        <PollProvider>
            <Poll></Poll>
        </PollProvider>
    );
}

export default CreatePoll