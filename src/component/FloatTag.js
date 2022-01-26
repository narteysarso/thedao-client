import { Typography } from "antd";

export default function FloatTag({children, ...props}){
    return(
        <Typography.Paragraph className={`f-lora ${props.className}`} style={
                {
                    boxShadow: '0 0 4px 2px #cbcbcc44', 
                    padding: '10px', 
                    borderRadius: '10px', 
                    textAlign: 'center',
                    ...props.style
                }
            }>
            {children}
        </Typography.Paragraph>
    )
}