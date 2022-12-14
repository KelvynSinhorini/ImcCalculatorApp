import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    resultImc: {
        flex: 1,
        marginTop: 20,
        paddingTop: 15,
        alignItems: "center",
        width: "100%",
    },
    numberImc: {
        fontSize: 48,
        color: "#FF0043",
        fontWeight: "bold"
    },
    information: {
        fontSize: 18,
        color: "#FF0043",
        fontWeight: "bold"
    },
    shareBox: {
        width: "100%",
        alignItems: "center",
        marginBottom: 10
    },
    shareButton: {
        backgroundColor: "#1877F2",
        borderRadius: 50,
        paddingBottom: 5,
        paddingTop: 5
    },
    shareText: {
        color: "#FFF",
        fontWeight: "bold",
        paddingHorizontal: 30
    }
});

export default styles;