import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import userJson from  '../../../assets/data/user.json';
import { use, useLayoutEffect, useState } from "react";
import React from "react";
import ExperienceListItem from "@/components/ExperienceListItem";
import { User, Experience } from "@/types";

export default function UserProfile() {
    const [user, setUser] = useState<User>(userJson);

    const { id } = useLocalSearchParams();
    const navigation = useNavigation();

    const onConnect = () => {
        console.warn('Connect with ' + user.name);
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: user.name });
    }, [user?.name]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                {/* BG Image */}
                <Image source={{ uri: user.backImage }} style={styles.backImage} />

                <View style={styles.headerContent}>
                    {/* Profile image */}
                    <Image source={{ uri: user.image }} style={styles.image} />

                    {/* Name and position */}
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>{user.position}</Text>

                    {/* Connect button */}
                    <Pressable onPress={onConnect} style={styles.button}>
                        <Text style={styles.buttonText}>Connect</Text>
                    </Pressable>
                </View>
            </View>

            {/* About */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.paragraph}>{user.about}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {user.experiences?.map((exp: Experience) => (
                    <ExperienceListItem key={exp.id} experience={exp} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    header: {
        backgroundColor: 'white',
        marginBottom: 5,
    },
    backImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
    },
    headerContent : {
        padding: 10,
        paddingTop: 0,
    },
    image: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },

    button: {
        backgroundColor: 'royalblue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },

    section: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 5,
    },
    paragraph: {
        lineHeight: 20,
    },
})