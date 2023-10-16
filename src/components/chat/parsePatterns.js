const parsePatterns = (item) => {
    const isLeft = item && item[0].color === "black";
    return ([
        {
            pattern: /#(\w+)/,
            style: { textDecorationLine: 'underline', color: '#7AAB78' },
        }, {
            type: "url",
            style: {
                textDecorationLine: "underline",
                color: '#3CA9FF',
            },
        }, {
            type: "phone",
            style: {
                color: '#3CA9FF',
            },
            // onPress: callNumber
        }, {
            type: "email",
            style: {
                color: '#3CA9FF',
            },
            // onPress: sendEmailTo
        }
    ])
}
export default parsePatterns;