import './App.css';

function App() {

    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();

    function makeRequest(method: string, url: string) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    playerManager.setMessageInterceptor(
        cast.framework.messages.MessageType.LOAD,
        request => {
            return new Promise((resolve, reject) => {
                // Fetch content repository by requested contentId
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                makeRequest('GET', 'https://storage.googleapis.com/cpe-sample-media/content.json').then(function (data: any) {
                    const item = data[request.media.contentId];
                    if (!item) {
                        // Content could not be found in repository
                        reject();
                    } else {
                        // Adjusting request to make requested content playable
                        request.media.contentUrl = item.stream.dash;
                        request.media.contentType = 'application/dash+xml';
                        // Add metadata
                        const metadata = new
                            cast.framework.messages.GenericMediaMetadata();
                        metadata.title = item.title;
                        metadata.subtitle = item.author;

                        request.media.metadata = metadata;

                        // Resolve request
                        resolve(request);
                    }
                });
            });
        });

    context.start();

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
        </div>
    );
}

export default App;