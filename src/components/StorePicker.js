import React from "react";
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
    goToStore (event) {
        event.preventDefault();
        //console.log(this.storeInput.value);
        // grab text from input
        const storeId = this.storeInput.value;
        //console.log(storeId);
        // go to store/:storeid
        this.context.router.transitionTo(`store/${storeId}` );

    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                {/* Example Comment */}
                <h2 className="h2">Please Enter A Store</h2>
                <input type="text" required placeholder="Manchester" defaultValue={getFunName()} ref={(input) => {this.storeInput = input } }/>
                <button>Select</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;