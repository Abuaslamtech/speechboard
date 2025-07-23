import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, View } from "react-native";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();
    // 👇 Grab custom tabBarStyle (set using navigation.setOptions)
  const tabBarStyle =
    descriptors[state.routes[state.index].key].options.tabBarStyle;

  // 👇 Hide tab bar manually if set to 'none'
  if (tabBarStyle?.display === "none") {
    return null;
  }

  return (
    <View className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
      <View className="w-4/5 p-2 rounded-full border-t border-x border-accentBlue bg-card flex flex-row">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;
          const getIconName = (routeName: string) => {
            switch (routeName) {
              case "index":
                return "home";
              case "favorites":
                return "heart";
              case "(settings)":
                return "settings";
              default:
                return "circle";
            }
          };
          const color = isFocused ? "#1B1C1E" : "#00CFFF";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              android_ripple={{
                color: "rgba(0, 207, 255, 0)",
              }}
              u
              className={`flex-1 items-center p-2 rounded-full  ${
                isFocused ? "bg-accentBlue " : "bg-card  "
              }`}
            >
              <Feather name={getIconName(route.name)} size={18} color={color} />
              <Text style={{ color }} className="text-xs mt-1">
                {typeof label === "string" ? label : route.name}
              </Text>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
}
