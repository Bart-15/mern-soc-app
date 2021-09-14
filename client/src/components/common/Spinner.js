import React from 'react'
import {css} from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'


const Spinner = (loading) => {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    return (
        <div>
            <ClipLoader css={override} size={150} loading={loading} color={"#333"} speedMultiplier={1.5} />
        </div>
    )
}

export default Spinner;