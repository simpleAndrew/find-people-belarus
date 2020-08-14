<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="js/demo.js"></script>
 
<div id="text"></div>

<form id="target">
  <input type="text" value="Фамилия">
  <input type="submit" value="Искать">
</form>

<script>
$(document).ready(function(){
    $("#submitBtn").click(function(){        
        $("#myForm").submit();
    });
});
</script>
<body>
    <form action="action.php" method="post" id="myForm">
        <label>First Name:</label>
        <input type="text" name="first-name">
        <button type="button" id="submitBtn">Submit Form</button>
    </form>
</body>
