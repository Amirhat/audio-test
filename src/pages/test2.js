import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Dyna2'), {
    ssr: false
})


export default function test2() {
    return (
        <div>
            <DynamicComponentWithNoSSR />
        </div>
    )
}