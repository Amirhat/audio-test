import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Dyna1'), {
    ssr: false
})


export default function test1() {
    return (
        <div>
            <DynamicComponentWithNoSSR />
        </div>
    )
}