import React, { Component } from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <form>
                    <input type="text" id="input" />
                    <label for="crazyCase" id="crazyCase"  >
                        <input type="radio" value="crazyCase" id="crazy" name="convert" />

                    </label>
                    <br />
                    <label for="normalCase" id="normalCase">
                        <input type="radio" value="nor" id="notcrazy" name="convert" />
                    not crazy
                </label>
                </form>
            </div>
        )
    }
}