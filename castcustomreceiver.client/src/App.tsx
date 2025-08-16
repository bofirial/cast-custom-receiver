import './App.css';

function App() {

    const context = cast.framework.CastReceiverContext.getInstance();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const playerManager = context.getPlayerManager();

    context.start();

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
        </div>
    );
}

export default App;