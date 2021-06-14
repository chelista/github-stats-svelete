<script>
    export let src;
</script>

<img src={src} alt="User Avatar"/>

<style>
    img {
        width: 32px;
    }

    img:hover {
        position: absolute;
        width: 96px;
        margin-top: -48px;
        margin-left: -32px;
        height: auto;
        display: block;
        z-index: 1;
        cursor: pointer;
    }
</style>
