import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { Post } from '@/types/Post';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';

type PostListItemProps = {
    post: Post;
};

type FooterBottonProps = {
    text: string;
    icon: React.ComponentProps<typeof FontAwesome>['name'];
};

function FooterBotton({ text, icon }: FooterBottonProps) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <FontAwesome name={icon} size={16} color="black" />
            <Text style={{ marginLeft: 5, color: 'gray', fontWeight: '500'}}>{text}</Text>
        </View>
    )
}

export default function PostListItem({ post }: PostListItemProps) {
    return (
        <Link href={`/posts/${post.id}`} asChild>
            <Pressable style={styles.container}>
                {/* Header */}
                <Link href={`/users/${post.author.id}`} asChild>
                    <Pressable style={styles.header}>
                        <Image source={{ uri: post.author.image }} style={styles.userImage}/>
                        <View>
                            <Text style={styles.username}>{post.author.name}</Text>
                            <Text>{post.author.position}</Text>
                        </View>
                    </Pressable>
                </Link>

                {/* Text content */}
                <Text style={styles.content}>{post.content}</Text>

                {/* Image content */}
                {post.image && (
                    <Image source={{ uri: post.image}} style={styles.postImage} />
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <FooterBotton text="Likes" icon="thumbs-o-up" />
                    <FooterBotton text="Comments" icon="comment-o" />
                    <FooterBotton text="Share" icon="share" />
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    // Body
    content: {
        margin: 10,
        marginTop: 0,
    },
    postImage: {
        width: '100%',
        aspectRatio: 1,
    },

    // Footer
    footer: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-around',
        borderTopWidth: 0.5,
        borderColor: 'lightgray',
    },
})