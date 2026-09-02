import { Text, TextInput, View, StyleSheet } from 'react-native';
import {COLORS, RADIUS, SPACING} from '../constants/theme';

export default function AppInput ({label, error, ...props}) {
    return (
        <View style={StyleSheet.container}>
            {label && <text>{label}</text>}
            <TextInput placeholderTextColor={COLORS.muted} {...props} />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: SPACING.md},
    label:{color:COLORS.text,fontWeight: '600', marginBottom:6},
    input:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.MD,
        padding: SPACING.sm,
        fomtSize:16,
    },
    errorInput:{bordercolor: COLORS.danger},
       error:{color: COLORS.danger,fontSize:12, marginTop: 4}
});