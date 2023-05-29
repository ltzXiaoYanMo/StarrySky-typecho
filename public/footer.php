        <footer>
            <div class="tin-footer">
                <p>© <?php $this->options->footerInfo() ?>| Powered by <a href="http://typecho.org/">Typecho</a> & <a href="https://blog.owoii.com/">StarrySky</a> | Loading time ：<?php echo timer_stop();?></p>
            </div>
        </footer>
        
    </div>
</div>

<!--搜索框-->
        <div class="sousou-z"></div>
        <div class="sousou">
        <form id="search" method="post" action="<?php $this->options->siteUrl(); ?>" role="search">
            <input type="text" id="s" name="s" placeholder="请输入内容..."><input type="submit" value="搜索">
        </form>
       </div> 

<?php $this->options->footerJs() ?>

<script src="<?php $this->options->themeUrl('style/js/viewer.min.js'); ?>"></script>
<script src="<?php $this->options->themeUrl('style/js/jquery-viewer.min.js'); ?>"></script>
<script src="<?php $this->options->themeUrl('style/js/style.min.js?b=1.0.5'); ?>"></script>
<script src="<?php $this->options->themeUrl('style/js/i.js'); ?>"></script>

<?php if (!$this->is('index')): ?>
<div class="toTop">
    <span class="iconfont icon-jiantoushang"></span>
</div>
<?php endif; ?>



</body>
</html>