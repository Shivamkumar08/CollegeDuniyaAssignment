import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { DataTable } from 'react-native-paper';

const App = () => {
  const [data, setData] = useState([]);
  const [paragraph, setParagraph] = useState([]);
  const [showTable, setShowTable] = useState(false); // State to toggle table visibility
  const [showParagraph, setShowParagraph] = useState(false); // State to toggle paragraph visibility
  const [showKeyParagraph, setShowKeyParagraph] = useState(false); // State to toggle key paragraph
  const [showTable2, setShowTable2] = useState(false); // State to toggle table visibility
  const [page, setPage] = useState(0); // State to track the current page
  // api data keeping
  const [keyParagraph, setKeyParagraph] = useState([]);
  const [tableApiData, setTableApiData] = useState([]);

  // fetching api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://harpreetcd.github.io/reactnative.json',
        );
        const jsonData = await response.json();
        const mainData = jsonData.report.favourablePoints[0].data;
        const formattedData = Object.entries(mainData).map(([key, value]) => ({
          key,
          value,
        }));
        setData(formattedData);

        const paragraphData = jsonData.report.numerologyReport;
        console.log(paragraphData, 'pd')
        setParagraph(paragraphData);

        const keyParagraphData = jsonData.report.ascendantReport;
        console.log(keyParagraphData, 'kpd')
        setKeyParagraph(keyParagraphData);

        const tableData = jsonData.houseCuspsAndSandhi[0].data;
        setTableApiData(tableData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleParagraphPress = () => {
    setShowTable(false);
    setShowTable2(false);
    setShowKeyParagraph(false);
    setShowParagraph(true);
  };

  const handleKeyValuePress = () => {
    setShowTable(true);
    setShowParagraph(false);
    setShowKeyParagraph(false);
    setShowTable2(false);
  };

  const handlePageChange = pageNumber => {
    setPage(pageNumber); // Update the current page when pagination is changed
  };

  const handleKeyParagraphPress = () => {
    setShowKeyParagraph(true);
    setShowTable(false);
    setShowTable2(false);
    setShowParagraph(false);
  };

  const handleTablePress = () => {
    setShowTable2(true);
    setShowTable(false);
    setShowParagraph(false);
    setShowKeyParagraph(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, showTable && styles.activeButton]}
            onPress={handleKeyValuePress}>
            <Text style={styles.buttonText}>Key-Value</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, showParagraph && styles.activeButton]}
            onPress={handleParagraphPress}>
            <Text style={styles.buttonText}>Paragraph</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, showKeyParagraph && styles.activeButton]}
            onPress={handleKeyParagraphPress}>
            <Text style={styles.buttonText}>Key-Paragraph</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, showTable2 && styles.activeButton]}
            onPress={handleTablePress}>
            <Text style={styles.buttonText}>Table</Text>
          </TouchableOpacity>
        </ScrollView>
        {showTable && (
          <View style={styles.tableContainer}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Key</DataTable.Title>
                <DataTable.Title>Value</DataTable.Title>
              </DataTable.Header>
              {data.slice(page * 5, (page + 1) * 5).map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.key}</DataTable.Cell>
                  <DataTable.Cell>{item.value}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            {/* Pagination */}
            <View style={styles.paginationContainer}>
              {[...Array(Math.ceil(data.length / 5)).keys()].map(pageNumber => (
                <TouchableOpacity
                  key={pageNumber}
                  style={[
                    styles.pageButton,
                    page === pageNumber ? styles.activePageButton : null,
                  ]}
                  onPress={() => handlePageChange(pageNumber)}>
                  <Text style={styles.pageButtonText}>{pageNumber + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {showParagraph && (
          <ScrollView style={styles.scrollContainer}>
            {paragraph.map((item, index) => (
              <View key={index} style={styles.paragraphContainer}>
                <Text style={styles.heading}>{item.heading}</Text>
                {item.data.map((paragraphText, pIndex) => (
                  <Text key={pIndex} style={{ color: 'black' }}>{paragraphText}</Text>
                ))}
              </View>
            ))}
          </ScrollView>
        )}
        {showKeyParagraph && keyParagraph.length > 0 && (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.paragraphContainer}>
              <Text style={styles.heading}>{keyParagraph[0].heading}</Text>
              <Text style={{ color: 'black' }}>{keyParagraph[0].data.report}</Text>
            </View>
          </ScrollView>

        )}
        {showTable2 && (
          <View style={styles.tableContainer}>
            <ScrollView vertical style={styles.scrollContainer}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Degree</DataTable.Title>
                  <DataTable.Title>House</DataTable.Title>
                  <DataTable.Title>Sign</DataTable.Title>
                  <DataTable.Title>Sign Lord</DataTable.Title>
                  <DataTable.Title>Start Lord</DataTable.Title>
                  <DataTable.Title>Sub Lord</DataTable.Title>
                </DataTable.Header>
                {tableApiData.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{item.degree}</DataTable.Cell>
                    <DataTable.Cell>{item.house}</DataTable.Cell>
                    <DataTable.Cell>{item.sign}</DataTable.Cell>
                    <DataTable.Cell>{item.sign_lord}</DataTable.Cell>
                    <DataTable.Cell>{item.start_lord}</DataTable.Cell>
                    <DataTable.Cell>{item.sub_lord}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {

    backgroundColor: 'white',
    flex: 1
  },
  container: {
    marginTop: 10,
    padding: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 10,
    height: 70,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageButton: {
    padding: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#3498db',
  },
  pageButtonText: {
    color: '#333',
  },
  scrollContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 500, // Set a maximum height for the scroll container
  },
  paragraphContainer: {
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  activeButton: {
    backgroundColor: '#2ecc71',
  },
});

export default App;
