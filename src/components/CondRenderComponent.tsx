export const CondRenderComponent = (props: any) => {

    const condRender = () => {
        if (props.cond) {
            return props.children;
        }
    }

    return (
        condRender()
    );
}