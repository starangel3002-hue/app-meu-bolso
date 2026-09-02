import { ActivityIndicator, Text, TouchableOpacity,StyleSheet } from "react-native";
import {COLORS, RADIUS, SPACING} from '../constants/theme';

export default function AppButton(
    {title,onPress,Loading=false,distable=false}
){
    return (
        <TouchableOpacity
        
        style={[styles.button, (disabled || loading)
            && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
            >
          {loading?
<ActivityIndicator color= "#fff"/> :
<Text style={styles.title}>{title}</Text>}
   </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    button: { backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        alignItems: 'center',
    
    },
    disabled: {opacity: .6},
    text:{color: '#fff', fontSize: 16, fontWeight: '700'},
})