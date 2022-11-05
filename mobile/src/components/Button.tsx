import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}
export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      // justifyContent="flex-start"
      h={14}
      rounded="sm"
      fontSize="md"
      p={0}
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: {
          color: "black",
        },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
