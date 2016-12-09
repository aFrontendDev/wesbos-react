import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import Base from "../base";

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        // get initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        // runs before <app> rendered
        this.ref = Base.syncState(`${this.props.params.storeId}/fishes`,
        {
            context: this,
            state: 'fishes'
        });

        // check if order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            // update <App>
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        Base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`,
        JSON.stringify(nextState.order));
    }

    addFish (fish) {
        // current state
        const fishes = {...this.state.fishes};

        // add new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        // set state
        this.setState({fishes})
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fished};
        fishes[key] = updatedFish;
        this.setState({ fishes});
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder (key) {
        // get copy of order
        const order = {...this.state.order};

        // update or add no. of fish order
        order[key] = order[key] + 1 || 1;

        // update state
        this.setState({ order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Awesome Seafoods" /> 
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(
                                    key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
                                )
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    params={this.props.params} 
                />
                <Inventory 
                    addFish={this.addFish} 
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                /> 
            </div>
        )
    }
}

export default App;