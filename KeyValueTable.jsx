
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';


const KeyValueTable = () => {
    return (
        <View style={styles.container}>
            <Text>KeyValueTable</Text>
        </View>
    )
}

export default KeyValueTable

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '100%',
        backgroundColor: 'red',
        marginTop: 50
    }
})