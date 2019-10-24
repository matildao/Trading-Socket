import io from 'socket.io-client';
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';

(function () {
    let graphs = {};
    let first = true;
    let graphContainer = document.getElementById("graphs");
    let socket = io.connect("https://trading-prices.maols.se");

    socket.on('connect', () => {
        console.log("Connected");
    });

    socket.on('disconnect', () => {
        console.log("Disconnected");
    });

    socket.on('stocks', (message) => {
        if (first) {
            var palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });

            message.map((pokemon) => {
                let graphTitle = document.createElement("h1");

                graphTitle.textContent = pokemon.title;

                let graphElement = document.createElement("div");

                graphContainer.appendChild(graphTitle);
                graphContainer.appendChild(graphElement);

                let graph = new Rickshaw.Graph({
                    element: graphElement,
                    width: "500",
                    height: "300",
                    renderer: "line",
                    series: new Rickshaw.Series.FixedDuration([{
                        name: pokemon.title,
                        color: palette.color(),
                    }], undefined, {
                        timeInterval: 5000,
                        maxDataPoints: 1000,
                        timeBase: new Date().getTime() / 1000
                    })
                });

                graph.configure({
                    width: graphContainer.clientWidth,
                });

                new Rickshaw.Graph.Axis.Time({ graph: graph });

                new Rickshaw.Graph.Axis.Y({
                    graph: graph,
                    orientation: 'left',
                    tickFormat: Rickshaw.Fixtures.Number.formatKMBT
                });

                new Rickshaw.Graph.HoverDetail({
                    graph: graph
                });

                graph.render();

                let slug = slugify(pokemon.title);

                graphs[slug] = {
                    name: pokemon.title,
                    graph: graph,
                };
            });
            first = false;
        }

        message.map((pokemon) => {
            let slug = slugify(pokemon.title);
            let data = {};

            data[pokemon.title] = pokemon.startingPrice;
            graphs[slug].graph.series.addData(data);
            graphs[slug].graph.render();
        });
    });
})();

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
