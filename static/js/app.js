const filePath = "samples.json";

const dataPromise = d3.json(filePath);
console.log(`Data Promise: ${dataPromise}`);

dataPromise.then(function(data) {
    console.log(data)
    let names = data.names
    let demographic = data.metadata
    let samples = data.samples
    // console.log(names)
    // console.log(demographic)
    // console.log(samples)

    for (var name of names) {
        var option = document.createElement('option')
        option.value = name,
        option.text = name,
        document.getElementById('selDataset').appendChild(option)
    }

    function init(data) {
    
        var studydata = data.samples[0]
        var demodata = data.metadata[0]

        let values = []
        let ids = []

        for (let i = 0; i < studydata.otu_ids.length; i++){
            values.push(studydata.sample_values[i])
            console.log(studydata.sample_values[i])
            ids.push('OTU ' + studydata.otu_ids[i].toString())

            if(i >= 9){
                i += studydata.otu_ids.length
            }
        }

        let list =  document.createElement('ul')
        list.id = 'list'
        document.getElementById('sample-metadata').appendChild(list)

        for (const info in demodata){
            let words = document.createElement('p')
            words.textContent = info + ': ' + demodata[info]
            words.id = info
            document.getElementById('list').appendChild(words)
        }

        let barchart = [{
            x: values,
            y: ids,
            type: 'bar',
            orientation: 'h'
        }];

        let bubblechart = [{
            x: ids,
            y: values,
            text: studydata.otu_labels,
            mode: 'markers',
            marker: {
                size: values,
                color: ['red', 'salmon', 'orange', 'yellow', 'lightgreen', 'cornflowerblue', 'mediumslateblue', 'indigo', 'purple', 'violet']
            }
        }];

        let layout = {
            title: 'OTU ID',
            showlegend: false,
            height: 600,
            width: 800
        }

        Plotly.newPlot('bar', barchart)
        Plotly.newPlot('bubble', bubblechart, layout)
    }

    document.getElementById('selDataset').onchange = function(){optionChanged(data)};

    function optionChanged(data){
        console.log('Subject ID updated.')

        let names = data.names
        let demographic = data.metadata
        let samples = data.samples

        let dropDownMenu = d3.select('#selDataset')
        let newID = dropDownMenu.property('value')
        let newindex = names.indexOf(newID)

        let values = []
        let ids = []

        let demodata = demographic[newindex]
        for(const info in demodata){
            document.getElementById(info).textContent = info + ': ' + demodata[info]
        }

        studydata = samples[newindex]

        for(let i = 0; i < studydata.otu_ids.length; i++){
            values.push(studydata.sample_values[i])
            // console.log(studydata.sample_values[i])
            ids.push('OTU ' + studydata.otu_ids[i].toString())

            if(i >= 9){
                i += studydata.otu_ids.length
            }
        }

        let barchart = [{
            x: values,
            y: ids,
            type: 'bar',
            orientation: 'h'
        }];

        let bubblechart = [{
            x: ids,
            y: values,
            text: studydata.otu_labels,
            mode: 'markers',
            marker: {
                size: values,
                color: ['red', 'salmon', 'orange', 'yellow', 'lightgreen', 'cornflowerblue', 'mediumslateblue', 'indigo', 'purple', 'violet']
            }
        }];

        let layout = {
            title: 'OTU ID',
            showlegend: false,
            height: 600,
            width: 800
        }

        Plotly.newPlot('bar', barchart)
        Plotly.newPlot('bubble', bubblechart, layout)
    }


    d3.selectAll('#selDataset').on('change', thisFunction);

    function thisFunction() {
        var dropDownMenu = d3.select('#selDataset');
        var dataset = dropDownMenu.property('value');
    };

    init(data);
});

