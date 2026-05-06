import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
               // initialRouteName: "index",
                headerShown: false,
                tabBarActiveTintColor: "#a78bfa",
                tabBarInactiveTintColor: "#9ca3af",
                tabBarStyle: {
                    backgroundColor: "#111827",
                    borderTopColor: "#374151",
                    height: 70,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: () => null,
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: "Skills",
                    tabBarIcon: () => null,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: () => null,
                }}
            />
        </Tabs>
    );
}
