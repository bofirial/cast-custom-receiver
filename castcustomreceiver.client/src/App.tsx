import './App.css';

function App() {

    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();

    console.log(playerManager.broadcastStatus);

    const options = new cast.framework.CastReceiverOptions();

    const CHANNEL = 'urn:x-cast:rogueshambo';

    options.customNamespaces = Object.assign({});
    options.customNamespaces[CHANNEL] = cast.framework.system.MessageType.STRING;

    options.disableIdleTimeout = false;
    options.versionCode = 2;

    context.addCustomMessageListener(CHANNEL, function (event) {
        console.log(event);
        playerManager.pause();
    });

    //{
    //    customNamespaces: { 'urn:x-cast:rogueshambo': cast.framework.system.MessageType.STRING },
    //    disableIdleTimeout: false,
    //        versionCode: 1
    //}
    context.start(options);

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
        </div>
    );
}

export default App;