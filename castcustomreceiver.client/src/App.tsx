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

    console.log('Registering Custom Message Listener');

    console.log(options);

    context.start(options);

    context.addCustomMessageListener(CHANNEL, function (event) {
        console.log(event);
        playerManager.pause();
    });

    return (
        <div></div>
    );
}

export default App;