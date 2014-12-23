<?php

class Validate
{
	public $_errors = array();
	private $_passed = false,
			//$_errors = array(),
			$_db = null;
	
	public function __construct()
	{
		$this->_db = DB::getInstance();
	}
	
	public function check($source, $items = array())
	{
		foreach($items as $item => $rules) //$item will be each of the entries e.g. nhsnumber, password. $rules will be the array that governs each $item. see register.php.
		{
			foreach($rules as $rule => $rule_value)
			{
				$item = escape($item); //for sanitization. 
				$value = trim($source[$item]); //get rid of whitespaces. 
				
				if($rule === 'required' && empty($value))
				{
					$this->addError("{$item} is required");
				} else if(!empty($value)){
					switch($rule)
					{
						case 'min': if(strlen($value)<$rule_value) { $this-> addError("{$item} must be a minimum of {$rule_value} characters"); }
							break;
						case 'max': if(strlen($value)>$rule_value) { $this-> addError("{$item} must be a maximum of {$rule_value} characters"); }
							break;
						case 'matches': if($value != $source[$rule_value]) { $this-> addError("{$rule_value} must match {$item}"); }
							break;
						case 'unique':
							$check = $this->_db->get($rule_value, array($item,'=',$value));
							if($check->count()) { $this -> addError("{$item} already exists"); }
							break;
					}
				}
				
				echo $source[$item].'<br />';
				//echo "{$item} {$rule} must be {$rule_value} <br />"; //uncomment this if you want to see the specific rules on the screen after clicking register.
				//$value = $source[$item];
				//echo $value.'<br />';
				
			}	
		}
		
		if(empty($this->_errors)) //if the errors array is empty
		{
			$this->_passed = true;
		}
		
		return $this;
	}
	
	private function addError($error)
	{
		$this->_errors[] = $error;
	}
	
	public function errors()
	{
		return $this->_errors;
	}
	
	public function passed()
	{
		return $this->_passed;
	}
	
}
?>