import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: new Array(6).fill(0)
        }
    }

    listener = (target) => {
        let rando = Math.floor(Math.random() * anecdotes.length)
        if (target === "votes") {
            const votes = this.state.votes.slice()
            votes[this.state.selected] = this.state.votes[this.state.selected] + 1
            return () => {
                this.setState({
                    [target]: votes
                })
            }
        }
        return () => {
            this.setState({
                [target]: rando
            })
        }
    }

    render() {
        const getMaxVotes = () => (
            Math.max(...this.state.votes)
        )
        return (
            <div>
                <Text selected={this.state.selected} votes={this.state.votes[this.state.selected]} />
                <Button
                    handleClick={this.listener("selected")}
                    text="Random anecdote" />
                <Button
                    handleClick={this.listener("votes")}
                    text="Vote!" />
                <h1>Highest rated anecdote</h1>
                <Text selected={this.state.votes.indexOf(getMaxVotes())} votes={getMaxVotes()} />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Text = ({ selected, votes }) => (
    <div>
        <p>
            {anecdotes[selected]}
        </p>
        <p>
            Has {votes} votes.
        </p>
    </div>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)